using Imagekit.Sdk;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Newtonsoft.Json;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;
using WinellyApi.Data;
using WinellyApi.Interfaces;
using WinellyApi.Models;
using WinellyApi.Services;
using WinellyApi.Services.GeoServices;
using WinellyApi.Services.ImageKitServices;

namespace WinellyApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter 'Bearer {token}'"
                });

                options.AddSecurityRequirement(documnet => new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", documnet)] = []
                });
            });

            builder.Services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlite(builder.Configuration.GetConnectionString("WinellyDbConnection")));

            builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(5),
                    NameClaimType = ClaimTypes.NameIdentifier,
                    RoleClaimType = ClaimTypes.Role
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = ctx =>
                    {
                        Console.WriteLine($"Auth failed: {ctx.Exception?.Message}");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = ctx =>
                    {
                        Console.WriteLine("Token validated.");
                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddSingleton(new ImagekitClient(
                publicKey: builder.Configuration["ImageKit:PublicKey"],
                privateKey: builder.Configuration["ImageKit:PrivateKey"],
                urlEndPoint: builder.Configuration["ImageKit:UrlEndpoint"]
            ));

            builder.Services.AddScoped<IImageKitService, ImageKitService>();

            builder.Services.AddControllers()
                .AddNewtonsoftJson(options => { 
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            builder.Services.AddScoped<ITokenService, TokenService>();

            builder.Services.AddHttpClient<IGeoService, GeoService>();

            var allowedOrigins = new[] { "http://localhost:5173", "https://localhost:5173" };
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Localhost5173Policy", policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            var app = builder.Build();

            // Def admin user
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    SeedRolesAndAdminAsync(services, app.Configuration).GetAwaiter().GetResult();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding roles or the admin user.");
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("Localhost5173Policy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        private static async Task SeedRolesAndAdminAsync(IServiceProvider services, IConfiguration configuration)
        {
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            var logger = services.GetService<ILogger<Program>>();

            string[] roles = new[] { "Admin", "User" };
            foreach (var roleName in roles)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                    if (!roleResult.Succeeded)
                    {
                        logger?.LogWarning("Failed to create role {Role}: {Errors}", roleName, string.Join(", ", roleResult.Errors.Select(e => e.Description)));
                    }
                }
            }

            var adminEmail = configuration["AdminUser:Email"] ?? "admin@admin.com";
            var adminPassword = configuration["AdminUser:Password"] ?? "Admin123!";

            var admin = await userManager.FindByEmailAsync(adminEmail);
            if (admin == null)
            {
                admin = new AppUser
                {
                    FirstName = "Admin",
                    LastName = "Admin",
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createAdminResult = await userManager.CreateAsync(admin, adminPassword);
                if (!createAdminResult.Succeeded)
                {
                    logger?.LogError($"Failed to create admin user: {createAdminResult.Errors.Select(e => e.Description)}");
                    return;
                }
            }

            if (!await userManager.IsInRoleAsync(admin, "Admin"))
            {
                var addToRoleResult = await userManager.AddToRoleAsync(admin, "Admin");
                if (!addToRoleResult.Succeeded)
                {
                    logger?.LogError($"Failed to add admin user to role Admin: {addToRoleResult.Errors.Select(e => e.Description)}");
                }
            }
        }
    }
}

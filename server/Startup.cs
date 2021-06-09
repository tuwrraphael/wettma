using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Wettma.Services;

namespace Wettma
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            WebHostEnvironment = environment;
            environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        }


        public IConfiguration Configuration { get; }
        public IWebHostEnvironment WebHostEnvironment { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<WettmaContext>(options =>
                options.UseSqlite($"Data Source={Path.Combine(WebHostEnvironment.WebRootPath, "App_Data", "wettma.db")}",
                    sql => sql.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name)));

            services.AddTransient<IGamesService, GamesService>();
            services.AddTransient<IOddsRefreshService, OddsRefreshService>();
            services.AddTransient<IOddsService, OddsService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IBetsService, BetsService>();
            services.AddHttpClient();
            services.AddControllers();
            services.Configure<CrawlingSettings>(Configuration);
            services.Configure<AuthSettings>(Configuration);
            services.AddOptions();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(options =>
              {
                  options.Authority = "https://accounts.google.com/";
                  options.Audience = Configuration["GoogleClientID"];
                  options.Events = new JwtBearerEvents()
                  {
                      OnTokenValidated = async context =>
                      {
                          var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                          var sub = context.Principal.Claims.Where(p => p.Type == ClaimTypes.NameIdentifier).SingleOrDefault();
                          if (null == sub)
                          {
                              context.Fail("Expected sub claim not provided");
                          }
                          else
                          {
                              var user = await userService.FindByGoogleSub(sub.Value);
                              if (null == user)
                              {
                                  context.Fail("User not registered");
                              }
                              else
                              {
                                  var claims = new List<Claim>
                                    {
                                        new Claim(ClaimTypes.Name,user.Id)
                                    };
                                  var appIdentity = new ClaimsIdentity(claims, "wettma");
                                  context.Principal.AddIdentity(appIdentity);
                              }
                          }
                      }
                  };
              });
            services.AddCors(options =>
            {
                options.AddPolicy("P", builder => builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:9000", "https://wettma.kesal.at", "https://tuwrraphael.github.io/wettma"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("P");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

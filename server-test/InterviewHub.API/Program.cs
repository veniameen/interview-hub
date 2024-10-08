using System.Reflection;
using BaseProject.API.Hubs;
using BaseProject.API.Middleware;
using InterviewHub.Application;
using InterviewHub.Application.Common.Mappings;
using InterviewHub.Application.Interfaces;
using InterviewHub.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddAutoMapper(config =>
    {
        config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
        config.AddProfile(new AssemblyMappingProfile(typeof(IDbContext).Assembly));
    });

    builder.Services.AddApplication();
    builder.Services.AddPersistence(builder.Configuration);
    builder.Services.AddControllers();

    builder.Services.AddSignalR();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowAnyOrigin();
        });
    });

    // builder.Services.AddAuthentication(config =>
    //     {
    //         config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //         config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //     })
    //     .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme
            //options =>
            // {
            //     options.Authority = builder.Configuration.GetSection("IdentityService:Host").Value;
            //     options.Audience = "ApplicationAPI";
            //     options.RequireHttpsMetadata = false;
            // }
        //);
}

{
    var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCustomExceptionHandler();
    app.UseRouting();
    app.UseHttpsRedirection();

    app.UseCors("AllowAll");

    //app.UseAuthentication();
    //app.UseAuthorization();

    app.UseHubs();
    app.MapControllers();

    app.Run();
}
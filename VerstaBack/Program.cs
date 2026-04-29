using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using VerstaBack.Contexts;
using VerstaBack.Managers;
using VerstaBack.Tools;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
builder.Services.AddDbContext<OrderContext>(opts => opts.UseInMemoryDatabase("VerstaBackDb"));
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.Configure<ConnectionOptions>(builder.Configuration.GetSection(ConnectionOptions.Section));
builder.Services.AddScoped<OrderManager>();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "VerstaBack.v1",
        Version = "v1"
    });

    var filePath = Path.Combine(AppContext.BaseDirectory, "VerstaBack.xml");
    if (File.Exists(filePath))
        c.IncludeXmlComments(filePath);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("../swagger/v1/swagger.json", "VerstaBack v1");
        c.OAuthClientId("api_swagger");
        c.OAuthClientSecret("api_swagger_secret");
        c.OAuthAppName("VerstaBack - Swagger");
        c.OAuthScopes("SwaggerAPI");
    });
}

app.MapControllers();
app.UseHttpsRedirection();
app.UseRouting();

app.Run();
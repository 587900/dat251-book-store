using Microsoft.EntityFrameworkCore;
using ItemService.Models;
using Newtonsoft.Json;
using JsonSubTypes;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string bookDiscriminator = "discriminator";

builder.Services.AddControllers();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.Converters.Add(
        JsonSubtypesConverterBuilder
        .Of(typeof(Book), bookDiscriminator)
        .RegisterSubtype(typeof(PhysicalBook), BookType.PhysicalBook)
        .RegisterSubtype(typeof(EBook), BookType.EBook)
        .SerializeDiscriminatorProperty()
        .Build()
    );
});
builder.Services.AddDbContext<ItemServiceContext>(opt => opt.UseInMemoryDatabase("ItemService"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.UseAllOfToExtendReferenceSchemas();
    c.UseAllOfForInheritance();
    c.UseOneOfForPolymorphism();
    c.SelectDiscriminatorNameUsing(type =>
    {
        return type.Name switch
        {
            nameof(Book) => bookDiscriminator,
            _ => null
        };
    });
});

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

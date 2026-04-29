using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using VerstaBack.Models;

namespace VerstaBack.Contexts;

public class OrderContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    public OrderContext() { }
    
    public OrderContext(DbContextOptions<OrderContext> dynamicOptions, IOptions<ConnectionOptions> options) : base(dynamicOptions) { }
}
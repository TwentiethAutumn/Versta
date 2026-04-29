using Microsoft.EntityFrameworkCore;
using VerstaBack.Contexts;
using VerstaBack.Models;
using VerstaBack.ModelsDto;

namespace VerstaBack.Managers;

public class OrderManager
{
    private OrderContext _context;

    public OrderManager(OrderContext context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetOrders()
    {
        return await _context.Orders.AsNoTracking().ToListAsync();
    }

    public async Task<Order?> GetOrderById(int id)
    {
        return await _context.Orders.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task SaveOrder(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteOrder(int id)
    {
        var orderToRemove = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);

        if (orderToRemove is null) return false;
        
        _context.Orders.Remove(orderToRemove);
        await _context.SaveChangesAsync();
        return true;
    }
}
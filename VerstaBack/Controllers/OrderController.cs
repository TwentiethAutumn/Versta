using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VerstaBack.Managers;
using VerstaBack.Models;
using VerstaBack.ModelsDto;

namespace VerstaBack.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class OrderController : Controller
{
    private readonly OrderManager _manager;
    private readonly IMapper _mapper;

    public OrderController(OrderManager manager, IMapper mapper)
    {
        _manager = manager;
        _mapper = mapper;
    }

    #region Get
    
    /// <summary>
    /// Получение списка заказов
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<List<Order>> GetOrders()
    {
        return await _manager.GetOrders();
    }

    /// <summary>
    /// Получение заказа по ID
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<Order?> GetOrderById(int id)
    {
        return await _manager.GetOrderById(id);
    }
    
    #endregion

    /// <summary>
    /// Создание заказа
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> CreateOrder(OrderDto orderDto)
    {
        var order = _mapper.Map<Order>(orderDto);

        if (order is null) return BadRequest();
        
        await _manager.SaveOrder(order);
        return Ok(order);

    }

    /// <summary>
    /// Удаление заказа
    /// </summary>
    /// <param name="id"></param>
    [HttpDelete]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var result = await _manager.DeleteOrder(id);
        if (result)
            return Ok();
        return BadRequest();
    }
}
using AutoMapper;
using VerstaBack.Models;
using VerstaBack.ModelsDto;

namespace VerstaBack.Tools;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Order, OrderDto>();

        CreateMap<OrderDto, Order>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
    }
}
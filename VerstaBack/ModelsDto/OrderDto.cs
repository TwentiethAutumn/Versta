namespace VerstaBack.ModelsDto;

public class OrderDto
{
    public string SenderCity { get; set; }
    public string SenderAddress { get; set; }
    public string ReceiverCity { get; set; }
    public string ReceiverAddress { get; set; }
    public float CargoWeight { get; set; }
    public DateTime ReceiveDate { get; set; }
}
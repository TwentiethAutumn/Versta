namespace VerstaBack.Models;

public class Order
{
    public int Id { get; set; }
    public string SenderCity { get; set; }
    public string SenderAddress { get; set; }
    public string ReceiverCity { get; set; }
    public string ReceiverAddress { get; set; }
    public float CargoWeight { get; set; }
    public DateTime ReceiveDate { get; set; }
}
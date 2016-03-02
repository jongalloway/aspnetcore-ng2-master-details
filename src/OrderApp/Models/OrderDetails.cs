namespace OrderApp.Models
{
    public class OrderDetails
    {
        public int OrderDetailsId { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public virtual Order Order { get; set; }
    }
}
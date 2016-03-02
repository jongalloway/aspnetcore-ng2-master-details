using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderApp.Models
{
    public class OrderDetailsItem
    {
        public int OrderDetailsId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }
        
        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string Comments { get; set; }

        public decimal Total { get { return this.Price * this.Quantity;  } }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrderApp.Models
{
    public class Order
    {
        [JsonProperty(PropertyName = "id")]
        public int OrderId { get; set; }

        public DateTime Date { get; set; }

        public decimal OrderTotal { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }

        public string Continent { get; set; }

        public string Language { get; set; }

        public string Phone { get; set; }

        [Required]
        public virtual List<OrderDetails> OrderDetails { get; set; }
    }
}

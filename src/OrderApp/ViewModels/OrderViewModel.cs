using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderApp.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }

        public string Date { get; set; }

        public decimal OrderTotal { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }

        public string Continent { get; set; }

        public string Language { get; set; }

        public string Phone { get; set; }
    }
}

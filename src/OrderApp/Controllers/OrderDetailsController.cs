using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using OrderApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderApp.Controllers
{
    [Route("api/[controller]")]
    public class OrderDetailsController : Controller
    {
        // GET api/values/5
        [HttpGet("{id}")]
        public OrderDetailsItem[] Get(int id)
        {
            return new OrderDetailsItem[] {
                new OrderDetailsItem()
                {
                    Comments = "",
                    OrderDetailsId = 1,
                    ProductName = "Hammer",
                    ProductId = 1,
                    Price = 20,
                    Quantity = 20
                }
            };
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]OrderDetailsItem value)
        {
        }
    }
}

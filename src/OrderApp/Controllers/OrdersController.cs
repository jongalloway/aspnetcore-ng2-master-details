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
    public class OrdersController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return new Order[] {
                new Order()
                {
                    Address= "1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763",
                    OrderTotal = 204,
                    Continent= "Europe",
                    Country = "Ireland",
                    Language = "English",
                    Date = new DateTime(),
                    Name = "John Doe",
                    OrderId = 1,
                    Phone= "35353"
                }
            };
        }
    }
}

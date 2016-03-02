using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using OrderApp.Models;
using OrderApp.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private OrdersContext context;

        public OrdersController(OrdersContext context)
        {
            this.context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<OrderViewModel> Get()
        {
            return this.context.Orders.Select( o =>
                new OrderViewModel()
                {
                    Address= o.Address,
                    OrderTotal = o.OrderDetails.Select(od => od.Quantity * od.Product.Price).Sum(),
                    Continent= o.Continent,
                    Country = o.Country,
                    Language = o.Language,
                    Date = o.Date.ToString(),
                    Name = o.Name,
                    Id = o.OrderId,
                    Phone= o.Phone
                });
        }

        // GET: api/Order/5
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<IActionResult> GetOrder([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            var order = await this.context.Orders
                                                .Include(o => o.OrderDetails)
                                                .ThenInclude(od => od.Product)
                                                .SingleAsync(m => m.OrderId == id);

            if (order == null)
            {
                return HttpNotFound();
            }

            return Ok(order.OrderDetails.Select(orderDetails => new OrderDetailsItem()
            {
                Comments = orderDetails.Comments,
                OrderDetailsId = orderDetails.OrderDetailsId,
                ProductName = orderDetails.Product.Name,
                ProductId = orderDetails.Product.ProductId,
                Price = orderDetails.Product.Price,
                Quantity = orderDetails.Quantity
            }));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.context.Dispose();
            }

            base.Dispose(disposing);
        }

    }
}

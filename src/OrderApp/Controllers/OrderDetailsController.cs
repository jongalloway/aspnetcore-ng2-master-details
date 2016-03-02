using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using OrderApp.Models;
using OrderApp.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class OrderDetailsController : Controller
    {
        private OrdersContext context;

        public OrderDetailsController(OrdersContext context)
        {
            this.context = context;
        }

        // PUT: api/OrderDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetails([FromRoute] int id, [FromBody] OrderDetailsItem orderDetails)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != orderDetails.OrderDetailsId)
            {
                return HttpBadRequest();
            }

            var storedOrderDetails = await this.context.OrderDetails.SingleAsync(m => m.OrderDetailsId == id);

            if (storedOrderDetails == null)
            {
                return HttpNotFound();
            }

            storedOrderDetails.Quantity = orderDetails.Quantity;
            storedOrderDetails.Comments = orderDetails.Comments;

            await this.context.SaveChangesAsync();
            
            return new HttpStatusCodeResult(StatusCodes.Status204NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.context.Dispose();
            }

            base.Dispose(disposing);
        }

        private bool OrderDetailsExists(int id)
        {
            return this.context.OrderDetails.Count(e => e.OrderDetailsId == id) > 0;
        }
    }
}

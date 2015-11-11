using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BusPlanner.API.Controllers
{
    public class Bus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Bus PartOfBus { get; set; }
    }

    public class RouteController : ApiController
    {
        [Route("api/route")]
        public Bus Get()
        {
            Bus b = new Bus();
            b.Id = 0;
            b.Name = "Hello";
            b.PartOfBus = new Bus();
            b.PartOfBus.Id = 1;
            b.PartOfBus.Name = "World";

            return b;

            //return "{ name: \"hello\", description: \"From API\" }";
        }
    }
}

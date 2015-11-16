using BusPlanner.DomainModels;
using BusPlanner.ServiceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BusPlanner.API.Controllers
{
    public class RouteController : ApiController
    {
        private ITripService tripService;


        [Route("api/stops")]
        public List<Stop> Get()
        {
            return tripService.GetStops();
        }
        /*
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
        }
        */
    }
}

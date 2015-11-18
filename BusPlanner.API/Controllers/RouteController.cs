using Autofac.Integration.WebApi;
using BusPlanner.DataAccess;
using BusPlanner.DomainModels;
using BusPlanner.ServiceLayer;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BusPlanner.API.Controllers
{
    [AutofacControllerConfiguration]
    public class RouteController : ApiController
    {
        private ITripService tripService;

        public RouteController(ITripService tripService)
        {
            this.tripService = tripService;
        }

        [EnableCors(origins: "http://localhost:65112", headers: "*", methods: "*")]
        [Route("api/stops")]
        public List<Stop> Get()
        {
            return tripService.GetStops();
        }
    }
}

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
        public RouteController()
        {
            
        }

        /*
        private ITripService tripService;

        public RouteController(ITripService tripService)
        //public RouteController()
        {
            this.tripService = tripService;
        }
        */

        [EnableCorsAttribute(origins: "http://localhost:65112", headers: "*", methods: "*")]
        [Route("api/stops")]
        public List<Stop> Get()
        {
            var tripService = new TripService(new UnitOfWork(new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BusPlanner"].ConnectionString)));
            return tripService.GetStops();
            //var stops = tripService.GetStops();
            //return tripService.GetStops();
        }
    }
}

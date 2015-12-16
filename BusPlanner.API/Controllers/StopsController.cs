using Autofac.Integration.WebApi;
using BusPlanner.DomainModels;
using BusPlanner.ServiceLayer;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BusPlanner.API.Controllers
{
    [AutofacControllerConfiguration]
    public class StopsController : ApiController
    {
        private IStopsService stopsService;

        public StopsController(IStopsService stopsService)
        {
            this.stopsService = stopsService;
        }

        // GET /api/stops
        public List<ViewModels.Stop> Get()
        {
            return stopsService.All();
        }

        // POST /api/stops
        public ViewModels.Stop Post(ViewModels.Stop stop)
        {
            return stopsService.Add(stop);
        }

        // GET /api/stops/id
        public ViewModels.Stop Get(int id)
        {
            return stopsService.Get(id);
        }

        // PUT /api/stops/id
        public ViewModels.Stop Put(int id, ViewModels.Stop stop)
        {
            return stopsService.Update(stop);
        }

        // DELETE /api/stops/id
        public void Delete(int id)
        {
            stopsService.Delete(id);
        }
    }
}

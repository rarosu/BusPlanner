using BusPlanner.DataAccess;
using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.ServiceLayer
{
    public class StopsService : IStopsService
    {
        private IUnitOfWork unitOfWork;

        public StopsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<ViewModels.Stop> All()
        {
            var viewStops = new List<ViewModels.Stop>();
            var stops = unitOfWork.Stops.All();

            foreach (var stop in stops)
            {
                var viewStop = new ViewModels.Stop { id = stop.Id, name = stop.UserFriendlyName, position = new ViewModels.LatLng { lat = stop.Latitude, lng = stop.Longitude }, zoneId = stop.ZoneId };
                viewStops.Add(viewStop);
            }

            return viewStops;
        }

        public ViewModels.Stop Get(int id)
        {
            var stop = unitOfWork.Stops.Get(id);
            var viewStop = new ViewModels.Stop { id = stop.Id, name = stop.UserFriendlyName, position = new ViewModels.LatLng { lat = stop.Latitude, lng = stop.Longitude }, zoneId = stop.ZoneId };
            return viewStop;
        }

        public ViewModels.Stop Add(ViewModels.Stop viewStop)
        {
            var stop = new Stop { UserFriendlyName = viewStop.name, Latitude = viewStop.position.lat, Longitude = viewStop.position.lng, ZoneId = viewStop.zoneId };

            // TODO: Remove this! Currently no support to select a zone on the front end, so this will have to be hard-coded.
            stop.ZoneId = 1;

            unitOfWork.Stops.Add(stop);
            unitOfWork.SaveChanges();

            viewStop.id = stop.Id;
            return viewStop;
        }

        public ViewModels.Stop Update(ViewModels.Stop viewStop)
        {
            var stop = new Stop { Id = viewStop.id, UserFriendlyName = viewStop.name, Latitude = viewStop.position.lat, Longitude = viewStop.position.lng, ZoneId = viewStop.zoneId };
            unitOfWork.Stops.Update(stop);
            unitOfWork.SaveChanges();
            return viewStop;
        }

        public void Delete(int id)
        {
            unitOfWork.Stops.Delete(id);
            unitOfWork.SaveChanges();
        }
    }
}

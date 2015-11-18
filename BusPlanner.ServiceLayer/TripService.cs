using BusPlanner.DataAccess;
using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.ServiceLayer
{
    public class TripService : ITripService
    {
        private IUnitOfWork unitOfWork;

        public TripService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Stop> GetStops()
        {
            return unitOfWork.Stops.All();
        }
    }
}

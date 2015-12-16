using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.ServiceLayer
{
    public interface IStopsService
    {
        List<ViewModels.Stop> All();

        ViewModels.Stop Get(int id);

        ViewModels.Stop Add(ViewModels.Stop stop);

        ViewModels.Stop Update(ViewModels.Stop stop);

        void Delete(int id);
    }
}

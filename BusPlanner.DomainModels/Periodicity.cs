using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// Periodicity is used to renew a scheduled route after it has finished.
    /// </summary>
    public enum Periodicity
    {
        Once,
        Weekends,
        Weekdays,
        Daily,
        Weekly,
        Monthly
    }
}

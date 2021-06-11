﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IOddsService
    {
        IAsyncEnumerable<Odds> GetOdds();
    }
}
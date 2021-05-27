using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.DataAccess;
using ParentPortal.Models;

namespace ParentPortal.Controllers
{
    [Route("api/schools")]
    [ApiController]
    public class SchoolsController : ControllerBase
    {
        SchoolRepository _repo;

        public SchoolsController()
        {
            _repo = new SchoolRepository();
        }

        [HttpGet]
        public IActionResult GetAllSchools()
        {
            return Ok(_repo.GetAll());
        }
    }
}

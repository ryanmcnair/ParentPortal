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
    [Route("api/classrooms")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        ClassroomRepository _repo;

        public ClassroomsController()
        {
            _repo = new ClassroomRepository();
        }

        [HttpGet]
        public IActionResult GetAllClassrooms()
        {
            return Ok(_repo.GetAll());
        }
    }
}

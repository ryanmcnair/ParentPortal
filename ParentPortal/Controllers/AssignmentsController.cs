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
    [Route("api/assignments")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        AssignmentRepository _repo;

        public AssignmentsController()
        {
            _repo = new AssignmentRepository();
        }

        [HttpGet]
        public IActionResult GetAllAssignments()
        {
            return Ok(_repo.GetAll());
        }
    }
}

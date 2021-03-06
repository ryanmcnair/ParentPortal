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
    [Route("api/students")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        StudentRepository _repo;

        public StudentsController()
        {
            _repo = new StudentRepository();
        }

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{classroomId}")]
        public IActionResult GetByClassroomID(int classroomId)
        {
            var student = _repo.GetByClassroomID(classroomId);
            if (student == null)
            {
                return NotFound("Classroom not found");
            }
            return Ok(student);
        }
    }
}

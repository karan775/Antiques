using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Antiques.Models
{
    public class Antique
    {  // Primary Key
        [Key]
        public int Id { get; set; }
        // Culteral Origin of the antique item
        public string CulteralOrigin { get; set; }
        // manufacturere of the antique item
        public string Manufacturer { get; set; }
        // antique item material 
        public string Material { get; set; }
        // condition of the antique item
        public string Condition { get; set; }

    }
}
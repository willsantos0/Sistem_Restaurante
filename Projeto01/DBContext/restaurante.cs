namespace Projeto01.DBContext
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("restaurante")]
    public partial class restaurante
    {
        public restaurante(){
            pratos = new Collection<prato>();
        }
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        [StringLength(100)]
        public string nome { get; set; }
        
        public virtual ICollection<prato> pratos { get; set; }
    }
}

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, MapPin, Clock, Users, Building, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface JobOffer {
  id: string;
  company: string;
  position: string;
  area: string;
  region: string;
  modalidad: string;
  duracion: string;
  horario: string;
  address: string;
  applicants: number;
  description: string;
  requirements: string[];
}

const Offers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    area: [],
    region: [],
    modalidad: [],
    duracion: [],
    horario: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const [offers] = useState<JobOffer[]>([
    {
      id: "1",
      company: "TechCorp Chile",
      position: "Desarrollador Full Stack",
      area: "Desarrollo Web",
      region: "Región Metropolitana",
      modalidad: "Híbrido",
      duracion: "6 meses",
      horario: "9:00-18:00",
      address: "Av. Vitacura 2939, Torre B, Piso 15, Las Condes, Santiago",
      applicants: 12,
      description: "Desarrollar aplicaciones web utilizando tecnologías modernas como React, Node.js y bases de datos relacionales.",
      requirements: ["React", "Node.js", "JavaScript", "Git"]
    },
    {
      id: "2",
      company: "AI Solutions Chile",
      position: "Machine Learning Engineer",
      area: "Inteligencia Artificial",
      region: "Región Metropolitana",
      modalidad: "Híbrido",
      duracion: "6 meses",
      horario: "10:00-19:00",
      address: "Nueva Las Condes 12205, Torre Norte, Piso 22, Las Condes, Santiago",
      applicants: 18,
      description: "Desarrollo e implementación de modelos de machine learning para soluciones empresariales.",
      requirements: ["Python", "TensorFlow", "PyTorch", "MLOps"]
    },
    {
      id: "3",
      company: "CyberSecure Corp",
      position: "Especialista en Ciberseguridad",
      area: "Ciberseguridad",
      region: "Región Metropolitana",
      modalidad: "Online",
      duracion: "5 meses",
      horario: "10:00-19:00",
      address: "Modalidad remota - Sin dirección física",
      applicants: 15,
      description: "Implementar y mantener sistemas de seguridad informática, realizar auditorías y análisis de vulnerabilidades.",
      requirements: ["Ethical Hacking", "Redes", "Linux", "Firewall"]
    },
    {
      id: "4",
      company: "DataTech Solutions",
      position: "Analista de Datos",
      area: "Ciencia de Datos",
      region: "Región Metropolitana",
      modalidad: "Presencial",
      duracion: "6 meses",
      horario: "9:00-18:00",
      address: "Av. Apoquindo 4800, Piso 10, Las Condes, Santiago",
      applicants: 20,
      description: "Análisis de grandes volúmenes de datos para generar insights de negocio.",
      requirements: ["Python", "SQL", "Power BI", "Excel"]
    },
    {
      id: "5",
      company: "MobileApp Dev",
      position: "Desarrollador Mobile",
      area: "Desarrollo Móvil",
      region: "Región Metropolitana",
      modalidad: "Híbrido",
      duracion: "5 meses",
      horario: "10:00-19:00",
      address: "Av. Vitacura 3568, Piso 8, Vitacura, Santiago",
      applicants: 14,
      description: "Desarrollo de aplicaciones móviles nativas para iOS y Android.",
      requirements: ["React Native", "Swift", "Kotlin", "Firebase"]
    },
    {
      id: "6",
      company: "CloudSystems Inc",
      position: "Ingeniero DevOps",
      area: "Infraestructura",
      region: "Región Metropolitana",
      modalidad: "Híbrido",
      duracion: "6 meses",
      horario: "9:00-18:00",
      address: "Av. Isidora Goyenechea 2800, Piso 12, Las Condes, Santiago",
      applicants: 16,
      description: "Implementación y mantenimiento de infraestructura cloud y pipelines CI/CD.",
      requirements: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      id: "7",
      company: "GameStudio Chile",
      position: "Desarrollador de Videojuegos",
      area: "Desarrollo de Juegos",
      region: "Región de Valparaíso",
      modalidad: "Presencial",
      duracion: "6 meses",
      horario: "10:00-19:00",
      address: "Av. España 2222, Valparaíso",
      applicants: 22,
      description: "Desarrollo de mecánicas de juego y sistemas para videojuegos indie.",
      requirements: ["Unity", "C#", "Git", "Blender"]
    },
    {
      id: "8",
      company: "FinTech Innovators",
      position: "Backend Developer",
      area: "Desarrollo Backend",
      region: "Región Metropolitana",
      modalidad: "Online",
      duracion: "6 meses",
      horario: "9:00-18:00",
      address: "Modalidad remota - Sin dirección física",
      applicants: 19,
      description: "Desarrollo de APIs y servicios backend para plataforma financiera.",
      requirements: ["Java", "Spring Boot", "PostgreSQL", "Microservicios"]
    },
    {
      id: "9",
      company: "UX Design Lab",
      position: "Diseñador UX/UI",
      area: "Diseño",
      region: "Región Metropolitana",
      modalidad: "Híbrido",
      duracion: "5 meses",
      horario: "10:00-19:00",
      address: "Av. Providencia 1650, Piso 5, Providencia, Santiago",
      applicants: 25,
      description: "Diseño de interfaces de usuario y experiencias digitales centradas en el usuario.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"]
    },
    {
      id: "10",
      company: "QA Testing Corp",
      position: "Ingeniero QA",
      area: "Testing",
      region: "Región Metropolitana",
      modalidad: "Presencial",
      duracion: "6 meses",
      horario: "9:00-18:00",
      address: "Av. El Bosque Norte 500, Piso 7, Las Condes, Santiago",
      applicants: 13,
      description: "Testing manual y automatizado de aplicaciones web y móviles.",
      requirements: ["Selenium", "Jest", "Postman", "JIRA"]
    }
  ]);


  const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>(offers);

  const filterOptions = {
    area: ["Desarrollo Web", "Inteligencia Artificial", "Ciberseguridad", "Ciencia de Datos", "Desarrollo Móvil", "Infraestructura", "Desarrollo de Juegos", "Desarrollo Backend", "Diseño", "Testing"],
    region: ["Región Metropolitana", "Región de Valparaíso"],
    modalidad: ["Presencial", "Online", "Híbrido"],
    duracion: ["5 meses", "6 meses"],
    horario: ["9:00-18:00", "10:00-19:00"]
  };

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      }
      return newFilters;
    });
  };

  const applyFilters = () => {
    let filtered = offers;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(offer => 
        offer.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filters
    Object.entries(selectedFilters).forEach(([category, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(offer => 
          values.includes(offer[category as keyof JobOffer] as string)
        );
      }
    });

    setFilteredOffers(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedFilters({
      area: [],
      region: [],
      modalidad: [],
      duracion: [],
      horario: []
    });
    setSearchQuery("");
    setFilteredOffers(offers);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApply = (offerId: string) => {
    setOpenDialog(null);
    toast({
      title: "Postulación enviada",
      description: "Tu postulación ha sido enviada exitosamente. Te contactaremos pronto.",
      className: "bg-green-600 text-white border-green-700",
    });
  };

  // Auto-apply company filter from URL params
  useEffect(() => {
    const companyParam = searchParams.get('company');
    if (companyParam) {
      setSearchQuery(companyParam);
      // Trigger search automatically
      setTimeout(() => {
        let filtered = offers;
        if (companyParam) {
          filtered = filtered.filter(offer => 
            offer.company.toLowerCase().includes(companyParam.toLowerCase())
          );
        }
        setFilteredOffers(filtered);
        setCurrentPage(1);
      }, 100);
    }
  }, [searchParams, offers]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Ofertas de Práctica</h1>
          <p className="text-muted-foreground">Encuentra la práctica perfecta para tu carrera</p>
        </div>

        {/* Search and Filters */}
        <Card className="card-shadow">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Buscar por empresa, puesto o palabras clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={applyFilters}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              
              {/* Filters Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                    {(Object.values(selectedFilters).flat().length > 0) && (
                      <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="default">
                        {Object.values(selectedFilters).flat().length}
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] max-h-[500px] overflow-y-auto z-50 bg-background" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="font-semibold">Filtros de búsqueda</h3>
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Limpiar todo
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(filterOptions).map(([category, options]) => (
                        <div key={category} className="space-y-3">
                          <Label className="font-medium capitalize text-base">
                            {category === "duracion" ? "Duración" : category}
                          </Label>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {options.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${category}-${option}`}
                                  className="rounded-none h-5 w-5"
                                  checked={selectedFilters[category].includes(option)}
                                  onCheckedChange={(checked) => 
                                    handleFilterChange(category, option, checked as boolean)
                                  }
                                />
                                <Label 
                                  htmlFor={`${category}-${option}`}
                                  className="text-sm cursor-pointer font-normal"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button onClick={applyFilters} className="flex-1">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredOffers.length} ofertas encontradas
          </p>
        </div>

        {/* Offers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedOffers.map((offer) => (
            <Card key={offer.id} className="card-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{offer.position}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">{offer.area}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {offer.company}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">{offer.description}</p>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-xs">{offer.region}</p>
                      <p className="text-muted-foreground text-xs truncate">{offer.modalidad}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-xs">{offer.duracion}</p>
                      <p className="text-muted-foreground text-xs truncate">{offer.horario}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{offer.applicants} postulantes</span>
                  </div>
                  
                  <Dialog open={openDialog === offer.id} onOpenChange={(open) => setOpenDialog(open ? offer.id : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        Postular
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Postular a {offer.position}</DialogTitle>
                        <DialogDescription>
                          Completa el formulario para enviar tu postulación a {offer.company}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor={`motivation-${offer.id}`}>Carta de Motivación</Label>
                          <Textarea
                            id={`motivation-${offer.id}`}
                            placeholder="Explica por qué te interesa esta práctica y qué puedes aportar..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`experience-${offer.id}`}>Experiencia Relevante</Label>
                          <Textarea
                            id={`experience-${offer.id}`}
                            placeholder="Describe tu experiencia previa relacionada con el puesto..."
                            className="min-h-[80px]"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`availability-${offer.id}`}>Disponibilidad</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu disponibilidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Inmediata</SelectItem>
                              <SelectItem value="1month">En 1 mes</SelectItem>
                              <SelectItem value="2months">En 2 meses</SelectItem>
                              <SelectItem value="semester">Próximo semestre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`portfolio-${offer.id}`}>Portafolio / GitHub</Label>
                          <Input
                            id={`portfolio-${offer.id}`}
                            type="url"
                            placeholder="https://github.com/tu-usuario o https://tu-portafolio.com"
                          />
                          <p className="text-xs text-muted-foreground">
                            Incluye tu portafolio o repositorio de GitHub para mostrar tus proyectos
                          </p>
                        </div>
                      </div>
                      
                      <Button onClick={() => handleApply(offer.id)} className="w-full">
                        Enviar Postulación
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <Card className="card-shadow">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No se encontraron ofertas que coincidan con tus criterios de búsqueda.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {filteredOffers.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
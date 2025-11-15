import { MapPin, Clock, Building, Calendar } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  const allOffers = [
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
      requirements: ["React", "Node.js", "JavaScript", "Git"],
      date: "2024-01-15"
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
      requirements: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      date: "2024-01-14"
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
      requirements: ["Ethical Hacking", "Redes", "Linux", "Firewall"],
      date: "2024-01-13"
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
      requirements: ["Python", "SQL", "Power BI", "Excel"],
      date: "2024-01-12"
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
      requirements: ["React Native", "Swift", "Kotlin", "Firebase"],
      date: "2024-01-11"
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
      requirements: ["AWS", "Docker", "Kubernetes", "Terraform"],
      date: "2024-01-10"
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
      requirements: ["Unity", "C#", "Git", "Blender"],
      date: "2024-01-09"
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
      requirements: ["Java", "Spring Boot", "PostgreSQL", "Microservicios"],
      date: "2024-01-08"
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
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      date: "2024-01-07"
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
      requirements: ["Selenium", "Jest", "Postman", "JIRA"],
      date: "2024-01-06"
    }
  ];

  // Get the 5 most recent offers for the carousel
  const featuredOffers = [...allOffers]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleApply = (offerId: string, company: string) => {
    setOpenDialog(null);
    toast({
      title: "Postulación enviada",
      description: `Tu postulación a ${company} ha sido enviada exitosamente. Te contactaremos pronto.`,
      className: "bg-green-600 text-white border-green-700",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-fade-in">
            Portal de Prácticas
            <span className="block gradient-text">USM Informática</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Conecta con las mejores oportunidades de práctica profesional en el área de informática
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="hero-gradient text-white">
            <Link to="/ofertas">Explorar Ofertas</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/perfil">Mi Perfil</Link>
          </Button>
        </div>
      </section>

      {/* Featured Offers Carousel */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ofertas Destacadas</h2>
          <p className="text-muted-foreground mt-2">Las 5 oportunidades más recientes</p>
        </div>
        
        <Carousel 
          setApi={setApi} 
          className="w-full max-w-5xl mx-auto"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {featuredOffers.map((offer) => (
              <CarouselItem key={offer.id}>
                <Card className="card-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl mb-2">{offer.position}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {offer.company}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{offer.area}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.address?.split(',')[0] || 'Santiago'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.duracion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.horario}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {offer.applicants} postulantes
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Dialog open={openDialog === offer.id} onOpenChange={(isOpen) => setOpenDialog(isOpen ? offer.id : null)}>
                        <DialogTrigger asChild>
                          <Button>Postular</Button>
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
                          
                          <Button onClick={() => handleApply(offer.id, offer.company)} className="w-full">
                            Enviar Postulación
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === current 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ir a oferta ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

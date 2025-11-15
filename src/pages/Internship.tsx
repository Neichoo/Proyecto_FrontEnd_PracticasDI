import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type InternshipType = "industrial" | "profesional";

const Internship = () => {
  const [openDialog, setOpenDialog] = useState<InternshipType | null>(null);
  const [industrialInternship, setIndustrialInternship] = useState<any>(null);
  const [professionalInternship, setProfessionalInternship] = useState<any>(null);

  const handleSubmitInternship = (type: InternshipType) => {
    setOpenDialog(null);
    toast({
      title: "Práctica registrada",
      description: `Tu práctica ${type === "industrial" ? "industrial" : "profesional"} ha sido registrada exitosamente.`,
      className: "bg-green-600 text-white border-green-700",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Mi Práctica</h1>
          <p className="text-muted-foreground">Gestiona tu práctica industrial y profesional</p>
        </div>

        {/* Práctica Industrial */}
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Práctica Industrial
                </CardTitle>
                <CardDescription className="mt-2">
                  Enfoque en desarrollo de habilidades técnicas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!industrialInternship ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">
                  Aún no tienes una práctica industrial ingresada
                </p>
                <Dialog open={openDialog === "industrial"} onOpenChange={(open) => setOpenDialog(open ? "industrial" : null)}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Inscribir práctica manualmente
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Inscribir Práctica Industrial</DialogTitle>
                      <DialogDescription>
                        Ingresa los datos de tu práctica industrial
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="industrial-company-rut">RUT de la Empresa</Label>
                        <Input
                          id="industrial-company-rut"
                          placeholder="12.345.678-9"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industrial-company-name">Nombre de la Empresa</Label>
                        <Input
                          id="industrial-company-name"
                          placeholder="Empresa S.A."
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industrial-company-address">Dirección</Label>
                        <Input
                          id="industrial-company-address"
                          placeholder="Av. Principal 123, Comuna, Ciudad"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industrial-supervisor-name">Nombre del Supervisor</Label>
                        <Input
                          id="industrial-supervisor-name"
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industrial-supervisor-email">Correo del Supervisor</Label>
                        <Input
                          id="industrial-supervisor-email"
                          type="email"
                          placeholder="supervisor@empresa.cl"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industrial-supervisor-phone">Teléfono del Supervisor</Label>
                        <Input
                          id="industrial-supervisor-phone"
                          type="tel"
                          placeholder="+56 9 1234 5678"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSubmitInternship("industrial")} className="w-full">
                      Registrar Práctica Industrial
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Aquí iría la información de la práctica industrial registrada */}
                <p className="text-sm text-muted-foreground">Práctica industrial registrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Práctica Profesional */}
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Práctica Profesional
                </CardTitle>
                <CardDescription className="mt-2">
                  Enfoque en desarrollo profesional y aplicación de conocimientos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!professionalInternship ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">
                  Aún no tienes una práctica profesional ingresada
                </p>
                <Dialog open={openDialog === "profesional"} onOpenChange={(open) => setOpenDialog(open ? "profesional" : null)}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Inscribir práctica manualmente
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Inscribir Práctica Profesional</DialogTitle>
                      <DialogDescription>
                        Ingresa los datos de tu práctica profesional
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="profesional-company-rut">RUT de la Empresa</Label>
                        <Input
                          id="profesional-company-rut"
                          placeholder="12.345.678-9"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profesional-company-name">Nombre de la Empresa</Label>
                        <Input
                          id="profesional-company-name"
                          placeholder="Empresa S.A."
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profesional-company-address">Dirección</Label>
                        <Input
                          id="profesional-company-address"
                          placeholder="Av. Principal 123, Comuna, Ciudad"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profesional-supervisor-name">Nombre del Supervisor</Label>
                        <Input
                          id="profesional-supervisor-name"
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profesional-supervisor-email">Correo del Supervisor</Label>
                        <Input
                          id="profesional-supervisor-email"
                          type="email"
                          placeholder="supervisor@empresa.cl"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profesional-supervisor-phone">Teléfono del Supervisor</Label>
                        <Input
                          id="profesional-supervisor-phone"
                          type="tel"
                          placeholder="+56 9 1234 5678"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSubmitInternship("profesional")} className="w-full">
                      Registrar Práctica Profesional
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Aquí iría la información de la práctica profesional registrada */}
                <p className="text-sm text-muted-foreground">Práctica profesional registrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Internship;

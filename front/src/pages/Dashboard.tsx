import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Building, MessageSquare } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type ApplicationStatus = "aceptada" | "esperando" | "rechazada" | "confirmada" | "anulada";

interface Application {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  applicationDate: string;
  responseDate?: string;
  comments?: string;
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      company: "TechCorp Chile",
      position: "Desarrollador Full Stack",
      status: "aceptada" as ApplicationStatus,
      applicationDate: "2024-03-15",
      responseDate: "2024-03-20",
      comments: "El equipo quedó impresionado con tu experiencia en React y Node.js."
    },
    {
      id: "2",
      company: "DataSoft Solutions",
      position: "Analista de Datos",
      status: "esperando" as ApplicationStatus,
      applicationDate: "2024-03-18"
    },
    {
      id: "3",
      company: "CyberSecure Corp",
      position: "Especialista en Ciberseguridad",
      status: "rechazada" as ApplicationStatus,
      applicationDate: "2024-03-10",
      responseDate: "2024-03-14",
      comments: "Buscamos un candidato con más experiencia en pentesting."
    },
    {
      id: "4",
      company: "CloudTech Solutions",
      position: "Ingeniero DevOps",
      status: "esperando" as ApplicationStatus,
      applicationDate: "2024-03-20"
    },
    {
      id: "5",
      company: "Mobile Innovations",
      position: "Desarrollador Mobile",
      status: "aceptada" as ApplicationStatus,
      applicationDate: "2024-03-12",
      responseDate: "2024-03-16"
    }
  ].sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()));

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "aceptada":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "confirmada":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "esperando":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "rechazada":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "anulada":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case "aceptada":
        return "Aceptada";
      case "confirmada":
        return "Aceptada";
      case "esperando":
        return "Esperando Respuesta";
      case "rechazada":
        return "Rechazada";
      case "anulada":
        return "Postulación Anulada";
      default:
        return status;
    }
  };

  const handleConfirmPractice = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: "confirmada" as ApplicationStatus } : app
    ));
    toast({
      title: "Práctica confirmada",
      description: "Has confirmado tu práctica exitosamente.",
      className: "bg-green-500/10 border-green-500/20",
    });
  };

  const handleCancelApplication = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: "anulada" as ApplicationStatus } : app
    ));
    toast({
      title: "Postulación anulada",
      description: "Has anulado tu postulación.",
      variant: "destructive",
    });
  };

  const stats = {
    total: applications.length,
    accepted: applications.filter(app => app.status === "aceptada" || app.status === "confirmada").length,
    pending: applications.filter(app => app.status === "esperando").length,
    rejected: applications.filter(app => app.status === "rechazada" || app.status === "anulada").length
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Mis Postulaciones</h1>
          <p className="text-muted-foreground">Gestiona y da seguimiento a tus postulaciones</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-shadow text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold gradient-text">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="card-shadow text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">{stats.accepted}</div>
              <p className="text-sm text-muted-foreground">Aceptadas</p>
            </CardContent>
          </Card>
          <Card className="card-shadow text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="card-shadow text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-muted-foreground">{stats.rejected}</div>
              <p className="text-sm text-muted-foreground">Rechazadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id} className="card-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{application.position}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {application.company}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(application.status)} variant="outline">
                    {getStatusText(application.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Fecha de postulación</p>
                      <p className="text-muted-foreground">
                        {new Date(application.applicationDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  {application.responseDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Fecha de respuesta</p>
                        <p className="text-muted-foreground">
                          {new Date(application.responseDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {application.comments && (
                  <div className="flex gap-2 p-3 bg-muted rounded-md">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Comentarios</p>
                      <p className="text-sm text-muted-foreground">{application.comments}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {application.status === "aceptada" && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-green-600 hover:bg-green-700">
                            Confirmar Práctica
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar práctica</AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro que deseas confirmar esta práctica? Esta acción indicará a la empresa que aceptas su oferta.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleConfirmPractice(application.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                            Anular Postulación
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Anular postulación</AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro que deseas anular esta postulación? Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleCancelApplication(application.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Anular
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}

                  {application.status === "confirmada" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                          Anular Práctica
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anular práctica</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro que deseas anular esta práctica confirmada? Esta acción notificará a la empresa.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleCancelApplication(application.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Anular
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {application.status === "esperando" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                          Anular Postulación
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anular postulación</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro que deseas anular esta postulación? Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleCancelApplication(application.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Anular
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

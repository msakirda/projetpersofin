declare module 'jwt-decode' {
    interface JwtPayload {
      // Définissez ici la structure des informations que vous attendez dans le payload JWT
      username: string;
      // Ajoutez d'autres champs au besoin
    }
  
    function jwtDecode<T = JwtPayload>(token: string): T;
  
    export = jwtDecode;
  }
  
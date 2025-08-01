import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@prisma/client';
import { getDashboardRoute } from '@/lib/auth';

export function useAuth(requiredRole?: UserRole | UserRole[]) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;
    
    // If no session and auth is required, redirect to signin
    if (!session && requiredRole) {
      router.push('/auth/signin');
      return;
    }
    
    // If session exists and role is required, check role
    if (session && requiredRole) {
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      const userRole = session.user.role as UserRole;
      
      if (!allowedRoles.includes(userRole)) {
        // Redirect to user's appropriate dashboard
        router.push(getDashboardRoute(userRole));
      }
    }
  }, [session, status, requiredRole, router]);
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    hasRole: (role: UserRole | UserRole[]) => {
      if (!session) return false;
      const allowedRoles = Array.isArray(role) ? role : [role];
      return allowedRoles.includes(session.user.role as UserRole);
    },
  };
}

// Specific role hooks for convenience
export function useStudent() {
  return useAuth(UserRole.STUDENT);
}

export function useParent() {
  return useAuth(UserRole.PARENT);
}

export function useCoach() {
  return useAuth(UserRole.COACH);
}

export function useAdmin() {
  return useAuth(UserRole.ADMIN);
}

export function useSchoolStaff() {
  return useAuth([
    UserRole.TEACHER,
    UserRole.COACH,
    UserRole.ATHLETIC_DIRECTOR,
    UserRole.SUPERINTENDENT,
    UserRole.SCHOOL_BOARD
  ]);
}
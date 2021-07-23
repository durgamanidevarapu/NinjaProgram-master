export class AccessVerifier {
    adminRole = 'admin';
    verifyRole(role: string): boolean {
        if (role.toLocaleLowerCase() === this.adminRole) {
            return true;
        }
        return false;
    }
}

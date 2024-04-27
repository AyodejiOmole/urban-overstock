import React from 'react';

import { redirect } from 'next/navigation';

export default function AdminAuth() {
  return redirect('/auth/admin/login');
}

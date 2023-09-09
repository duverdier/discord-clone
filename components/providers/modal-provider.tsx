"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useState, useEffect } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) null;
		return (
			<>
				<CreateServerModal />
			</>
		);
}
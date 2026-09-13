import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <span className="inline-block w-3 h-3 rounded-full bg-rose-500 mb-4 animate-pulse" />
            <h2 className="text-xl font-bold mb-2">Recargando vista principal</h2>
            <p className="text-neutral-400 text-sm mb-6">
              Se detectó un ajuste de renderizado. Haz clic abajo para restaurar la vista completa.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-full bg-[#2EE6A0] text-black font-semibold text-sm hover:bg-[#26c589] transition-all"
            >
              Reiniciar aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


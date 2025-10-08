# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 (App Router) boilerplate featuring Three.js 3D rendering via React Three Fiber. The project combines 3D graphics with interactive UI elements and animated backgrounds.

## Development Commands

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 13 with App Router
- **3D Rendering**: React Three Fiber (@react-three/fiber) with Three.js
- **3D Utilities**: @react-three/drei, @react-three/postprocessing
- **Animations**: GSAP
- **Debug Controls**: Leva (dev UI controls)
- **Styling**: Tailwind CSS + SCSS modules
- **Language**: TypeScript

### Directory Structure

```
/app                 # Next.js 13 App Router (pages and layouts)
/components          # React components (both 2D UI and 3D)
  /Scene.tsx         # Main 3D canvas and camera setup
  /Model.tsx         # 3D model loader and materials
  /Effects.tsx       # Post-processing effects (Bloom, Noise)
  /AnimationController # UI for controlling 3D animations
  /BackgroundAnimated  # Interactive gradient background
  /Header, /Button, /Container # UI components
/constants           # Configuration and constant values
  /animations.ts     # Animation names and configurations
/types               # TypeScript type definitions
  /animations.ts     # Animation-related types
/public/glb          # 3D model assets (.glb files)
```

### Key Architectural Patterns

1. **Client-Side 3D Rendering**
   - `Scene.tsx` is dynamically imported with `ssr: false` to prevent server-side rendering
   - All Three.js components must use `"use client"` directive

2. **3D Scene Setup** (components/Scene.tsx)
   - Uses `OrthographicCamera` positioned via Leva controls
   - Canvas renders fullscreen in a flex container
   - Post-processing effects applied via `<Effects />` component
   - Main 3D model rendered via `<Model />` component

3. **3D Model Loading** (components/Model.tsx)
   - Uses `useGLTF` hook from @react-three/drei
   - Models loaded from `/public/glb/` directory
   - Custom materials created with `useMemo` for performance
   - Animations controlled via `useAnimations` hook

4. **Post-Processing** (components/Effects.tsx)
   - `EffectComposer` from @react-three/postprocessing
   - Bloom and Noise effects configurable via Leva controls
   - Effects parameters exposed for real-time tuning

5. **Animation System**
   - Animation options defined as const array in `constants/animations.ts`
   - Type-safe animation names via `AnimationOptions` type
   - Animation controller component provides UI for triggering animations
   - Each animation has associated emoji for visual identification

6. **Path Aliases**
   - `@/*` maps to project root (configured in tsconfig.json)
   - Import components as `@/components/...`, constants as `@/constants/...`, etc.

7. **Styling Strategy**
   - Tailwind CSS for layout and utility classes
   - SCSS modules for component-specific styles (e.g., `BackgroundAnimated.module.scss`)
   - Component styles co-located with components in their directories

## Working with 3D Models

- Place `.glb` or `.gltf` files in `/public/glb/`
- Reference models in code as `"glb/filename.glb"` (no leading slash)
- Use `useGLTF.preload()` at end of component file for better performance
- Model nodes and materials are typed via `GLTFResult` interface

## Debug Tools

The Leva debug panel is integrated and collapsed by default:
- Camera controls: Position (X, Y, Z)
- Effects: Bloom parameters (luminance, intensity, smoothing)
- Effects: Noise parameters (opacity, intensity, blend mode)

Access Leva panel in development mode to tune visual parameters in real-time.

## Important Notes

- Three.js components require `"use client"` directive
- The Scene component must be dynamically imported with `ssr: false`
- Materials should be memoized with `useMemo` to prevent recreation on every render
- Animation frame cleanup is critical in interactive components (see BackgroundAnimated)

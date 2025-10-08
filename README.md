# Three.js Boilerplate 2025

<img width="1215" height="821" alt="Captura de pantalla 2025-10-07 a la(s) 9 16 45 p  m" src="https://github.com/user-attachments/assets/e8d41edf-e9f5-4efb-ba10-fafb9c7b433a" />

A modern Three.js boilerplate built with Next.js 13, React Three Fiber, and TypeScript. This starter template provides a solid foundation for building interactive 3D web experiences with best practices and powerful tooling out of the box.

## ✨ Features

- **Next.js 13 App Router** - Latest Next.js architecture with server/client components
- **React Three Fiber** - Declarative Three.js with React components
- **TypeScript** - Full type safety across the project
- **Post-Processing Effects** - Built-in Bloom and Noise effects with @react-three/postprocessing
- **GSAP Integration** - Professional-grade animation library
- **Leva Debug Panel** - Real-time parameter tuning during development
- **Interactive Background** - Animated gradient background with mouse interaction
- **Tailwind CSS + SCSS Modules** - Flexible styling options
- **3D Model Support** - GLB/GLTF loader with animation support
- **Development Tools** - ESLint configuration and hot reload

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd threejs-boilerplate

# Install dependencies
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your 3D scene.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
/app                    # Next.js App Router
  ├── layout.tsx       # Root layout
  └── page.tsx         # Home page
/components            # React components
  ├── Scene.tsx        # Main 3D canvas setup
  ├── Model.tsx        # 3D model loader
  ├── Effects.tsx      # Post-processing effects
  ├── AnimationController/  # Animation UI controls
  └── BackgroundAnimated/   # Interactive background
/constants             # App constants and configurations
  └── animations.ts    # Animation definitions
/types                 # TypeScript type definitions
/public
  └── glb/            # 3D models (.glb/.gltf files)
```

## 🎨 Customization

### Adding 3D Models

1. Place your `.glb` or `.gltf` files in `/public/glb/`
2. Update `Model.tsx` to load your model:

```typescript
const { nodes, materials, animations } = useGLTF("glb/your-model.glb") as GLTFResult;
```

3. Update the `GLTFResult` type to match your model's nodes and materials

### Adjusting Camera

The scene uses a perspective camera. Modify camera settings in `Scene.tsx`:

```typescript
<Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
```

### Post-Processing Effects

Configure effects in `Effects.tsx` or use the Leva debug panel at runtime to tune:
- Bloom intensity and threshold
- Noise opacity and blend modes

### Styling

- **Global styles**: Edit `app/globals.css`
- **Tailwind config**: Modify `tailwind.config.ts`
- **Component styles**: Use SCSS modules (e.g., `Component.module.scss`)

## 🛠️ Tech Stack

- [Next.js 13](https://nextjs.org/) - React framework
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Three.js](https://threejs.org/) - 3D graphics library
- [@react-three/drei](https://github.com/pmndrs/drei) - Useful helpers for R3F
- [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) - Post-processing effects
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Leva](https://github.com/pmndrs/leva) - GUI controls for development
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📝 Key Concepts

### Client-Side Rendering

Three.js components require client-side rendering. The `Scene` component is dynamically imported with `ssr: false`:

```typescript
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
```

All Three.js components use the `"use client"` directive.

### Performance Optimization

- Materials are memoized with `useMemo` to prevent recreation
- Models are preloaded using `useGLTF.preload()`
- Animation frames are properly cleaned up in `useEffect` hooks

## 🎯 Use Cases

This boilerplate is perfect for:

- Interactive product showcases
- 3D portfolio websites
- WebGL experiments and prototypes
- Creative coding projects
- Data visualizations in 3D
- Gaming experiences

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🚀 Deploy

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Digital Ocean

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

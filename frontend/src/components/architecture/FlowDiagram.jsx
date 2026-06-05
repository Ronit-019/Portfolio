import { useState, useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Info, HelpCircle } from "lucide-react";

export default function FlowDiagram({ config }) {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Find metadata of the hovered node
  const hoveredNodeMeta = useMemo(() => {
    if (!hoveredNodeId) return null;
    const matched = config.nodes.find((n) => n.id === hoveredNodeId);
    return matched ? { label: matched.label, ...matched.meta } : null;
  }, [hoveredNodeId, config]);

  // Construct React Flow Nodes with custom styling
  const flowNodes = useMemo(() => {
    return config.nodes.map((node) => {
      const isHovered = node.id === hoveredNodeId;

      return {
        id: node.id,
        type: node.type, // 'input', 'default', or 'output'
        data: { label: node.label },
        position: node.position,
        style: {
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: isHovered
            ? "1px solid var(--accent-primary)"
            : "1px solid var(--border-active)",
          borderRadius: "var(--radius-md)",
          padding: "12px 18px",
          fontSize: "12px",
          fontWeight: "600",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          boxShadow: isHovered
            ? "0 0 10px var(--accent-glow)"
            : "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        },
      };
    });
  }, [config, hoveredNodeId]);

  // Construct React Flow Edges
  const flowEdges = useMemo(() => {
    return config.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: edge.animated ?? true,
      style: {
        stroke: edge.source === hoveredNodeId || edge.target === hoveredNodeId
          ? "var(--accent-primary)"
          : "var(--border-active)",
        strokeWidth: 1.5,
        transition: "stroke 0.2s ease-in-out",
      },
      labelStyle: {
        fill: "var(--text-secondary)",
        fontSize: "9px",
        fontFamily: "var(--font-mono)",
        fontWeight: "bold",
      },
      labelBgStyle: {
        fill: "var(--bg-primary)",
        fillOpacity: 0.85,
        stroke: "var(--border-subtle)",
        strokeWidth: 0.5,
      },
    }));
  }, [config, hoveredNodeId]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Canvas container */}
      <div className="w-full h-[380px] bg-bg-primary border border-border-subtle rounded-xl overflow-hidden relative shadow-inner select-none">
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodeMouseEnter={(_, node) => setHoveredNodeId(node.id)}
          onNodeMouseLeave={() => setHoveredNodeId(null)}
          fitView
          nodesConnectable={false}
          nodesDraggable={true}
          zoomOnScroll={false}
          panOnDrag={true}
          preventScrolling={true}
        >
          <Background color="var(--border-active)" gap={16} size={1} />
          <Controls className="bg-bg-card border border-border-subtle rounded text-text-primary fill-text-primary" />
        </ReactFlow>
      </div>

      {/* Node Detail/Hover Panel */}
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 shadow-sm min-h-[140px] flex items-center justify-center">
        {hoveredNodeMeta ? (
          <div className="w-full space-y-3 animate-in fade-in duration-200 select-text">
            {/* Header info */}
            <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
              <Info size={14} className="text-accent-primary" />
              <h5 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                Component Details: <span className="text-accent-primary capitalize normal-case font-semibold">{hoveredNodeMeta.label}</span>
              </h5>
            </div>
            
            {/* Key Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Purpose</span>
                <p className="text-xs text-text-secondary leading-relaxed">{hoveredNodeMeta.purpose}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Inputs</span>
                <p className="text-xs text-text-secondary leading-relaxed font-mono">{hoveredNodeMeta.input}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Outputs</span>
                <p className="text-xs text-text-secondary leading-relaxed font-mono">{hoveredNodeMeta.output}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-danger/80">Tradeoffs / Limits</span>
                <p className="text-xs text-text-secondary leading-relaxed">{hoveredNodeMeta.limitations}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-text-muted text-xs select-none">
            <HelpCircle size={16} />
            <span>Hover or drag components inside the diagram canvas to inspect data inputs/outputs.</span>
          </div>
        )}
      </div>
    </div>
  );
}

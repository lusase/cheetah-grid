import type {
  CellContext,
  GridCanvasHelperAPI,
  ListGridAPI,
  SortState,
} from "../../ts-types";
import { BaseHeader } from "./BaseHeader";
import type { DrawCellInfo } from "../../ts-types-internal";
import { SortHeaderStyle } from "../style/SortHeaderStyle";
import { cellInRange } from "../../internal/utils";
import { getFontSize } from "../../internal/canvases";
import {isDef} from '../../internal/utils'

export class SortHeader<T> extends BaseHeader<T> {
  get StyleClass(): typeof SortHeaderStyle {
    return SortHeaderStyle;
  }
  drawInternal(
    value: string,
    context: CellContext,
    style: SortHeaderStyle,
    helper: GridCanvasHelperAPI,
    grid: ListGridAPI<T>,
    { drawCellBase }: DrawCellInfo<T>
  ): void {
    const {
      textAlign,
      textBaseline = "middle",
      color,
      bgColor,
      font,
      textOverflow,
      sortArrowColor,
    } = style;

    if (bgColor) {
      drawCellBase({
        bgColor,
      });
    }

    const state = grid.sortState as SortState;
    let order = undefined;
    const { col, row } = context;
    const range = grid.getCellRange(col, row);
    if (cellInRange(range, state.col, state.row)) {
      ({ order } = state);
    }

    const ctx = context.getContext();
    const arrowSize = getFontSize(ctx, font).width * 1.2;

    const icons = [
      {
        name: isDef(order)
          ? order === "asc"
            // swk 2020.9.1
            ? "arrow_down"
            : "arrow_up"
          : undefined,
        width: arrowSize,
        tail: true,
        color:
          helper.getColor(
            sortArrowColor || helper.theme.header.sortArrowColor,
            col,
            row,
            ctx
          ) || "rgba(0, 0, 0, 0.38)",
      },
    ];
    // swk 2020/9/20
    if (grid.header && grid.header[col] && grid.header[col].infoIcon) {
      icons.unshift({
        name: "info_outline",
        width: arrowSize,
        tail: true,
        color: "rgba(0, 0, 0, 0.38)"
      });
    }
    helper.text(value, context, {
      textAlign,
      textBaseline,
      color,
      font,
      textOverflow,
      icons,
    });
  }
}

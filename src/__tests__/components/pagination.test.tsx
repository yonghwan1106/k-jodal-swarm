import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination, PageSizeSelector } from "@/components/ui/pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders pagination with correct current page highlighted", () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const currentPageButton = screen.getByRole("button", { current: "page" });
    expect(currentPageButton).toHaveTextContent("3");
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const prevButton = screen.getByRole("button", { name: "이전 페이지" });
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: "다음 페이지" });
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when clicking a page number", () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const page5Button = screen.getByRole("button", { name: "5" });
    fireEvent.click(page5Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it("calls onPageChange when clicking next button", () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: "다음 페이지" });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange when clicking previous button", () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />
    );

    const prevButton = screen.getByRole("button", { name: "이전 페이지" });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("shows first/last buttons when showFirstLast is true", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
        showFirstLast={true}
      />
    );

    expect(screen.getByRole("button", { name: "첫 페이지" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "마지막 페이지" })).toBeInTheDocument();
  });

  it("jumps to first page when clicking first button", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
        showFirstLast={true}
      />
    );

    const firstButton = screen.getByRole("button", { name: "첫 페이지" });
    fireEvent.click(firstButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("jumps to last page when clicking last button", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
        showFirstLast={true}
      />
    );

    const lastButton = screen.getByRole("button", { name: "마지막 페이지" });
    fireEvent.click(lastButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });
});

describe("PageSizeSelector", () => {
  const mockOnPageSizeChange = jest.fn();

  beforeEach(() => {
    mockOnPageSizeChange.mockClear();
  });

  it("renders with default options", () => {
    render(
      <PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />
    );

    const select = screen.getByRole("combobox", { name: "페이지당 항목 수" });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("10");
  });

  it("renders with custom options", () => {
    render(
      <PageSizeSelector
        pageSize={25}
        onPageSizeChange={mockOnPageSizeChange}
        options={[25, 50, 75, 100]}
      />
    );

    const select = screen.getByRole("combobox", { name: "페이지당 항목 수" });
    const options = select.querySelectorAll("option");

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveValue("25");
  });

  it("calls onPageSizeChange when selection changes", () => {
    render(
      <PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />
    );

    const select = screen.getByRole("combobox", { name: "페이지당 항목 수" });
    fireEvent.change(select, { target: { value: "50" } });

    expect(mockOnPageSizeChange).toHaveBeenCalledWith(50);
  });
});

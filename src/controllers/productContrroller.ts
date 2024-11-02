import { Request, Response } from "express";
import prisma from "../configs/dbConfig";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    if (product.tags) {
      product.tags = product.tags.join(",");
    }

    const updateProduct = await prisma.product.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });

    res.status(200).json({
      message: "Product updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
     await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(204).json();
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prisma.product.count();

  const products = await prisma.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: 5, //query product 1 - 5
  });

  res.status(200).json({
    message: `Product count: ${count}`,
    data: products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      message: `Product id: ${product.id}`,
      data: product,
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

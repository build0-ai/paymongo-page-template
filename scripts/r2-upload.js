#!/usr/bin/env node
/**
 * R2 Upload Script
 *
 * Uploads the dist directory to Cloudflare R2.
 *
 * Usage: node scripts/r2-upload.js <dist-dir> <page-id>
 *
 * Environment variables:
 *   R2_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, stat } from "fs/promises";
import { join, extname } from "path";

// MIME type mapping
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

function createS3Client(config) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

async function uploadDirectory(s3Client, localDir, remotePrefix, bucketName) {
  const entries = await readdir(localDir, { withFileTypes: true });
  const uploadPromises = [];

  for (const entry of entries) {
    const localPath = join(localDir, entry.name);
    const remotePath = `${remotePrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      uploadPromises.push(
        uploadDirectory(s3Client, localPath, remotePath, bucketName)
      );
    } else {
      uploadPromises.push(
        uploadFile(s3Client, localPath, remotePath, bucketName)
      );
    }
  }

  await Promise.all(uploadPromises);
}

async function uploadFile(s3Client, localPath, remotePath, bucketName) {
  const fileContent = await readFile(localPath);
  const contentType = getMimeType(localPath);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: remotePath,
    Body: fileContent,
    ContentType: contentType,
  });

  await s3Client.send(command);
  console.log(`Uploaded: ${remotePath}`);
}

async function main() {
  const [distDir, pageId] = process.argv.slice(2);

  if (!distDir || !pageId) {
    console.error("Usage: node scripts/r2-upload.js <dist-dir> <page-id>");
    process.exit(1);
  }

  const config = {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
  };

  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    console.error("Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME");
    process.exit(1);
  }

  console.log(`Uploading ${distDir} to R2 for page ${pageId}...`);
  const startTime = Date.now();

  const s3Client = createS3Client(config);
  await uploadDirectory(s3Client, distDir, pageId, config.bucketName);

  console.log(`Upload completed in ${Date.now() - startTime}ms`);
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});

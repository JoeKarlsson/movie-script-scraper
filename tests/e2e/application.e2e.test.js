/**
 * Simplified End-to-End Tests for Movie Script Scraper Application
 * 
 * These tests verify basic command-line interface functionality without
 * making real network requests to prevent slow execution and CI/CD issues.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Movie Script Scraper E2E Tests (Simplified)', () => {
    const testDir = path.join(__dirname, '../../test-output-e2e');
    const appPath = path.join(__dirname, '../../src/app.js');
    const TEST_TIMEOUT = 5000; // 5 seconds timeout for each test

        beforeEach(() => {
            // Clean up test directory
            if (fs.existsSync(testDir)) {
                fs.rmSync(testDir, { recursive: true, force: true });
            }
            fs.mkdirSync(testDir, { recursive: true });
        });

        afterEach(() => {
            // Clean up test directory
            if (fs.existsSync(testDir)) {
                fs.rmSync(testDir, { recursive: true, force: true });
            }
        });

    describe('Command Line Interface', () => {
        it('should handle invalid genre gracefully', (done) => {
            const child = spawn('node', [appPath, '--genre', 'InvalidGenre', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(output).toContain('Sorry, invalid genre.');
                done();
            });
        });

        it('should reject title-based scraping with helpful message', (done) => {
            const child = spawn('node', [appPath, '--title', 'Test Movie', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(errorOutput).toContain('Title-based scraping has been disabled');
                expect(errorOutput).toContain('Recommended alternatives');
                done();
            });
        });

        it('should handle invalid arguments gracefully', (done) => {
            const child = spawn('node', [appPath, '--invalid-arg'], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                // Should handle invalid args gracefully
                expect([0, 1]).toContain(code);
                done();
            });
        });
    });

    describe('Application Validation', () => {
        it('should have proper file structure', () => {
            // Verify main application file exists
            expect(fs.existsSync(appPath)).toBe(true);
            
            // Verify source directory structure
            const srcDir = path.join(__dirname, '../../src');
            expect(fs.existsSync(srcDir)).toBe(true);
            
            // Verify main modules exist
            expect(fs.existsSync(path.join(srcDir, 'mss.js'))).toBe(true);
            expect(fs.existsSync(path.join(srcDir, 'app.js'))).toBe(true);
        });

        it('should handle missing arguments gracefully', (done) => {
            const child = spawn('node', [appPath], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                // Should handle missing args gracefully
                expect([0, 1]).toContain(code);
                done();
            });
        });

        it('should validate required modules can be loaded', () => {
            // Test that main modules can be required without errors
            expect(() => {
                require('../../src/mss');
            }).not.toThrow();

            expect(() => {
                require('../../src/app');
            }).not.toThrow();
        });
    });
});
